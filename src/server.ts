import builApp from "./app"
import { connectDB } from "./db/db"
import dotenv from "dotenv"


dotenv.config()

const start = async () => {
    try {
        await connectDB()
        const app = await builApp()
        
        await app.listen({
            port: Number(process.env.PORT) || 3333, 
            host: "0.0.0.0"
        })

        console.log(`Server running at port http://localhost:${process.env.PORT}/api`)
    } catch (error) {
        app.log.error(error)
        process.exit(1)
    }
}

start()