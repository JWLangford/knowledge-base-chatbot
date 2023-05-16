import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { pinecone } from "./pinecone.js";

const upload = async (loadedDocs) => {
  try {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 0,
    });

    const docs = await textSplitter.splitDocuments(loadedDocs);
    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      textKey: "text",
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const loadLocalFiles = async () => {
  try {
    const directoryLoader = new DirectoryLoader("dir", {
      ".pdf": (path) => new PDFLoader(path),
      ".json": (path) => new JSONLoader(path),
    });
    const docs = await directoryLoader.load();

    await upload(docs);
  } catch (error) {
    console.log("error", error);
    throw new Error("Your data could not be seeded");
  }
};

export const loadRepository = async (url, branch) => {
  try {
    const loader = new GithubRepoLoader(url, {
      branch: branch ?? "master",
      recursive: true,
      unknown: "warn",
    });
    const docs = await loader.load();

    await upload(docs);
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to add repository");
  }
};
