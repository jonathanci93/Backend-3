import { expect } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import User from "../models/User.js";
import Pet from "../models/Pet.js";

describe("Adoption router", () => {
    let server, agent, userId, petId;

    before(async () => {
        const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/backend3_test";
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(uri);
        }
        server = app.listen(0);
        agent = request.agent(server);

        const u = await User.create({ firstName: "Test", lastName: "User", email: `t${Date.now()}@u.com`, password: "hash" });
        const p = await Pet.create({ name: "Firulais" });
        userId = u._id.toString();
        petId = p._id.toString();
    });
    after(async function () {
    this.timeout(10000);
    await new Promise(resolve => setTimeout(resolve, 500)); 
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    }
    server.close();
    });


    it("POST /api/adoption/:uid/:pid adopta una mascota", async () => {
        const res = await agent.post(`/api/adoption/${userId}/${petId}`);
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal("success");
    });

    it("GET /api/adoption lista adoptados", async () => {
        const res = await agent.get(`/api/adoption`);
        expect(res.status).to.equal(200);
        expect(res.body.payload).to.be.an("array");
        expect(res.body.payload[0]).to.have.property("owner");
    });

    it("DELETE /api/adoption/:pid revierte adopción", async () => {
        const res = await agent.delete(`/api/adoption/${petId}`);
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal("success");
    });
});
