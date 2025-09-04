const User=require("../../module/user");
exports.seed=async()=>{
    try {
        const email= 'hassan@tekhqs.com'
        const code= "123456";
        const user = await User.findOne({ email: email });
        if (!user) {  
            await User.create({
                email: email,
                code: code,
            });
            console.log("User seeded successfully");
        }
        console.log("User already exists, skipping seed");
        return user
        
    } catch (error) {
        console.error("Error seeding user data:", error);
        throw error;
    }
}