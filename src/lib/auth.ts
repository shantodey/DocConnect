import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("DocConnect");

export const auth = betterAuth({
  database: mongodbAdapter(db, {

    client
  }),
  emailAndPassword: {
    enabled: true
  },
   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "Patient",
      },
      gender: {
        type: "string",
        required: false,
      }
    }
  }
});