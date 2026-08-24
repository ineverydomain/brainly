declare global {
    namespace Express {
        interface Request {
            userId?: string | mongoose.Types.ObjectId;
        }
    }
}
import mongoose from "mongoose";
//# sourceMappingURL=index.d.ts.map