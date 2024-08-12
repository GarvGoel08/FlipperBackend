const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createFlipCard = async (req, res) => {
  const { question, answer } = req.body;
  try {
    const flipCard = await prisma.flipCard.create({
      data: { userId: req.user.id, question, answer },
    });
    res.status(201).json({ message: "FlipCard created", flipCard });
  } catch (error) {
    res.status(400).json({ error: "FlipCard could not be created" });
  }
};

exports.getFlipCardsByUser = async (req, res) => {
  try {
    const flipCards = await prisma.flipCard.findMany({
      where: { userId: req.user.id },
    });
    res.json(flipCards);
  } catch (error) {
    res.status(400).json({ error: "Could not retrieve FlipCards" });
  }
};

exports.updateFlipCard = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  try {
    const flipCard = await prisma.flipCard.update({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
      data: { question, answer },
    });

    if (flipCard.count === 0) {
      return res
        .status(404)
        .json({ error: "FlipCard not found or not authorized" });
    }

    res.json({ message: "FlipCard updated" });
  } catch (error) {
    res.status(400).json({ error: "FlipCard could not be updated" });
  }
};

exports.deleteFlipCard = async (req, res) => {
  const { id } = req.params;

  try {
    const flipCard = await prisma.flipCard.deleteMany({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
    });

    if (flipCard.count === 0) {
      return res
        .status(404)
        .json({ error: "FlipCard not found or not authorized" });
    }

    res.json({ message: "FlipCard deleted" });
  } catch (error) {
    res.status(400).json({ error: "FlipCard could not be deleted" });
  }
};
