const User=require("../../modulels/user");
exports.seed=async()=>{
    try {
        const email= "ali@gmail.com";
        const code= "123456";
        const user = await User.findone({ email: email });
        if (!user) {  
            await User.create({
                email: email,
                code: code,
            });
            console.log("User seeded successfully");
        }
        return user
        
    } catch (error) {
        console.error("Error seeding user data:", error);
        throw error;
    }
}