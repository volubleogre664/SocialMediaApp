import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const context = ["/weatherforecast"];

app.use(
  createProxyMiddleware({
    target: "https://localhost:7285",
    secure: false,
  })
);
