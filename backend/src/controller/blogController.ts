import type { Request, Response } from "express";
import { createBlogSchema } from "../utils/type";
import { prisma } from "../../db";
import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import ENV from "../utils/config";


export async function getALlBlogsController(req: Request, res: Response){
    try {
        const userId = Number(req.userId);
        const blogs = await prisma.blog.findMany({
            where: {
                authorId: userId
            }
        });

        return res.status(200).json({
            blogs: blogs.map((blog) => ({
                id: blog.id,
                title: blog.title,
                content: blog.content
            }))
        })
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
}


export async function getSpecificBlogController(req: Request, res: Response){
    try {
        const Id = req.params.id;
        console.log("Inside the speicif route controller");
        console.log(Id);
        const blogId = Number(Id);
        const blog = await prisma.blog.findFirst({
            where: {
                id: blogId
            }
        })

        if(blog == null){
            return res.status(200).json({
                message: "No such blog exist"
            })
        }

        const user = await prisma.user.findFirst({
            where: {
                id: blog.authorId
            }
        })

        return res.status(200).json({
          id: blog.id,
          title: blog.title,
          content: blog.content,
          authorName: user?.name
        });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
}

export async function createBlogController(req:Request, res: Response ){
    try {
        console.log("inside the controller");
        const parsed = createBlogSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                message: "Wrong inputs"
            });
        }

        const {title, content, imageURL} = parsed.data;
        const userId = (req.userId!);
        console.log(userId)
        const blog = await prisma.blog.create({
            data: {
                title: title,
                content: content,
                authorId: userId,
                imageUrl: imageURL
            }
        })

        return res.status(201).json({
            id: blog.id,
            title:blog.title,
            content: blog.content
        })

    } catch (error) {
        console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
}


export async function presignController(req: Request, res: Response){
    try {
    let ACCESS_KEY_ID = "3d87ce9db4e77ca0747ba7351169bcc1";
    let ACCESS_KEY_SECRET = "afbe2c2da2984c4529d3eb05a1ff832c67161d9d568d7aa9b8d9ef5f6dafbfa6"
    let ACCESS_URL = "https://428e2045ae7369b9bb1de30453caa8b3.r2.cloudflarestorage.com"
    let PUB_URL = "https://pub-4796b9c468ce4128affc2e19a2dc44fb.r2.dev"
        
        const {type} = req.body;
        // actually I should validate the title and content over here only and then generate the presign
        if(!type){
            return res.status(400).json({
                message: "Wrong"
            });
        }
        let extension: string;
        let contentType: string;

        const split = type.split("/");
        if(split[0] != "image" && split[0] != "video"){
            return res.status(400).json({
                message: "Only images and video supported"
            })
        }


        extension = split[1];
        contentType = type;
        
        const path = `rithvik/${Math.random()}.${extension}`
        const S3 = new S3Client({
          region: "auto", // Required by SDK but not used by R2
          // Provide your Cloudflare account ID
          endpoint: ACCESS_URL,
          // Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
          credentials: {
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: ACCESS_KEY_SECRET,
          },
        });

        const putUrl = await getSignedUrl(
          S3,
          new PutObjectCommand({
            Bucket: "clown-clone",
            Key: path,
            ContentType: contentType,
          }),
          { expiresIn: 3600 },
        );

        return res.status(201).json({
            publicUrl: `${PUB_URL}/${path}`, 
            putUrl: putUrl
        })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
}