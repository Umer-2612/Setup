import { App } from "./app";

async function bootstrap() {
    try {
        const app = App.getInstance();
        await app.start();
    } catch (error) {
        console.error("Error starting the application:", error);
        process.exit(1);
    }
}

bootstrap();
