import { GetMySQLDataSource, CreateDataSource } from "@infrastructure/mysql/connection"
import { expect } from "chai"
import axios from 'axios'
import { UserEntity } from "@adapters/outbound/entities/UserEntity"


class HelperTestingRegister {
    async ClearDataTest(username: string = "qwe123") {
        const db = await GetMySQLDataSource().getFaDataSource()
        if (!db) {
                throw new Error("DataSource belum diinisialisasi");
            }

        const queryRunner = db.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const findId = await queryRunner.query(
                `SELECT id FROM users WHERE username = ?`,
                [username]
            )
            if (!findId.length){
                console.warn(`⚠ Tidak ada incubation untuk id ${findId} dan nama ${username}`)
                await queryRunner.rollbackTransaction();
                return;
            }
            const id = findId[0].id

            await queryRunner.query(
                `DELETE FROM users WHERE id = ?`,
                [id]
            )

            await queryRunner.commitTransaction()
            console.log(`✅ Data userId ${id} dan nama ${username} dihapus`)
        }catch(err){
            console.error("❌ Error hapus user:", err)
            await queryRunner.rollbackTransaction()
            throw err
        }finally{
            await queryRunner.release()
        }
    }
}

const Helper: HelperTestingRegister = new HelperTestingRegister()

describe("Setup Testing Register", () => {
    before(async function() {
        try {
            await CreateDataSource({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "",
                database: "fastify_login",
                entities: [UserEntity],
                synchronize: false,
            });
            console.log("🔥 SETUP READY AND START TEST")
        } catch (error) {
            console.error("teardown error:", error)
            throw error
        }
    })

    after(async function() {
        try {
            await Helper.ClearDataTest("qwe123")
            console.log("🔥 Cleanup done.")
        } catch (error) {
            console.error("teardown error:", error)
            throw error
        }
    })

    describe("Testing Register with Username qwe123 dan Password qweqwe", () => {
        it("should fail because password is missing", async () => {
            try {
                await axios.post(`http://localhost:3000/api/v1/register`, {
                    username: "qwe123"
                })
                expect.fail("Request should have failed")
            } catch (error: any) {
                expect(error.response.status).to.not.equal(200)
                expect(error.response.data).to.have.property("message")
            }
        })

        it("should fail because username is missing is missing", async () => {
            try {
                await axios.post(`http://localhost:3000/api/v1/register`, {
                    password: "qweqwe"
                })
                expect.fail("Request should have failed")
            } catch (error: any) {
                expect(error.response.status).to.not.equal(200)
                expect(error.response.data).to.have.property("message")
            }
        })

        it("should succeed with valid username and password", async () => {
            const res = await axios.post(`http://localhost:3000/api/v1/register`, {
                username: "qwe123",
                password: "qweqwe"
            })
            expect(res.status).to.equal(200) // Atau 201 jika kamu set reply.code(201)
            expect(res.data).to.have.property("message", "Register Succes")
            expect(res.data).to.have.property("data")
        })

        it("should fail to register with duplicate username", async () => {
        try {
            // Register pertama (pastikan user sudah ada)
            await axios.post(`http://localhost:3000/api/v1/register`, {
                username: "qwe123",
                password: "qweqwe"
            });
        } catch (e) {
            // Abaikan error jika user sudah ada dari test sebelumnya
        }

        try {
            // Register kedua dengan username yang sama
            await axios.post(`http://localhost:3000/api/v1/register`, {
                username: "qwe123",
                password: "qweqwe"
            });
            expect.fail("Request should have failed due to duplicate username");
        } catch (error: any) {
            expect(error.response.status).to.equal(401);
            expect(error.response.data).to.have.property("message");
            expect(error.response.data.message.toLowerCase()).to.include("username");
        }
        })
    })
})