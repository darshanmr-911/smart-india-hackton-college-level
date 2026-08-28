const mongoose = require("mongoose");

require("dotenv").config();

const YogaAsana =
    require("./models/YogaAsana");


const asanas = [

    {
        name: "Shavasana",

        englishName: "Corpse Pose",

        description:
            "A relaxation-focused yoga pose.",

        instructions: [
            "Lie comfortably on your back.",
            "Relax your arms beside your body.",
            "Allow your legs to rest naturally.",
            "Relax your shoulders.",
            "Breathe slowly."
        ],

        breathing:
            "Inhale slowly and exhale slowly.",

        commonMistakes: [
            "Holding your breath",
            "Tensing your shoulders",
            "Uncomfortable position"
        ],

        duration: 60,

        difficulty: "Beginner",

        focus: "Relaxation",

        animation: "shavasana"
    },


    {
        name: "Tadasana",

        englishName: "Mountain Pose",

        description:
            "A standing pose for posture and balance.",

        instructions: [
            "Stand tall.",
            "Keep your feet stable.",
            "Lengthen your spine.",
            "Relax your shoulders.",
            "Look forward.",
            "Breathe slowly."
        ],

        breathing:
            "Slow inhale and slow exhale.",

        commonMistakes: [
            "Rounded shoulders",
            "Locked knees",
            "Poor balance"
        ],

        duration: 30,

        difficulty: "Beginner",

        focus: "Posture & Balance",

        animation: "tadasana"
    },


    {
        name: "Trikonasana",

        englishName: "Triangle Pose",

        description:
            "A standing pose for balance and flexibility.",

        instructions: [
            "Stand with your feet comfortably wide.",
            "Turn one foot outward.",
            "Extend your arms.",
            "Reach gently toward your leg.",
            "Keep your chest open."
        ],

        breathing:
            "Breathe slowly throughout the pose.",

        commonMistakes: [
            "Overstretching",
            "Collapsing the chest",
            "Losing balance"
        ],

        duration: 45,

        difficulty: "Beginner",

        focus: "Balance & Flexibility",

        animation: "trikonasana"
    },


    {
        name: "Adho Mukha Svanasana",

        englishName: "Downward-Facing Dog",

        description:
            "A full-body stretching posture.",

        instructions: [
            "Start on your hands and knees.",
            "Lift your hips upward.",
            "Lengthen your spine.",
            "Keep your hands grounded.",
            "Straighten your legs comfortably."
        ],

        breathing:
            "Maintain steady breathing.",

        commonMistakes: [
            "Rounding the back",
            "Forcing the legs straight",
            "Holding breath"
        ],

        duration: 60,

        difficulty: "Beginner",

        focus: "Full Body Stretch",

        animation: "downward-dog"
    },


    {
        name: "Vrikshasana",

        englishName: "Tree Pose",

        description:
            "A balance-focused standing pose.",

        instructions: [
            "Stand tall.",
            "Shift your weight onto one foot.",
            "Place your other foot comfortably.",
            "Keep your body upright.",
            "Focus on a stable point."
        ],

        breathing:
            "Breathe slowly while maintaining balance.",

        commonMistakes: [
            "Looking around",
            "Collapsing the standing leg",
            "Losing balance"
        ],

        duration: 45,

        difficulty: "Beginner",

        focus: "Balance & Stability",

        animation: "tree"
    },


    {
        name: "Paschimottanasana",

        englishName: "Seated Forward Bend",

        description:
            "A seated pose focused on flexibility.",

        instructions: [
            "Sit with your legs extended.",
            "Keep your spine long.",
            "Lengthen forward.",
            "Reach toward your legs.",
            "Do not force the movement."
        ],

        breathing:
            "Inhale to lengthen and exhale gently.",

        commonMistakes: [
            "Forcing the stretch",
            "Holding breath",
            "Excessive rounding"
        ],

        duration: 60,

        difficulty: "Beginner",

        focus: "Flexibility",

        animation: "forward-bend"
    }

];


async function seed() {

    await mongoose.connect(
        process.env.MONGO_URI
    );

    await YogaAsana.deleteMany({});

    await YogaAsana.insertMany(
        asanas
    );

    console.log(
        "6 Yoga asanas inserted"
    );

    await mongoose.disconnect();

}

seed();