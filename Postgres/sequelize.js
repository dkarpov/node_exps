const user = "postgres";
const host = "localhost";
const database = "test";
const password = "322223";
const port = "5432";

const { Sequelize, Model, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: "postgres",
  logging: false,
});

class Dog extends Model {}

Dog.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "dog",
    timestamps: false,
  }
);

// finds data
async function finDogs() {
  try {
    const results = await Dog.findAll();
    console.log(results);
  } catch (err) {
    console.log(err);
  }
  //   Dog.findAll({
  //     where: {
  //       age: 8,
  //     },
  //   });
  //   Dog.findAll({
  //     limit: 10,
  //     order: [["name", "DESC"]],
  //   });
  //   Dog.findAll({
  //     where: {
  //       age: {
  //         [Op.gte]: 5,
  //       },
  //     },
  //   });
}

finDogs();

// insert in database
async function addDogs() {
  const name = "Roger";
  const age = 8;
  const result = await Dog.create({ name, age });
}

// addDogs();

async function updateDogs() {
  const result = await Dog.update(
    {
      age: 9,
    },
    {
      where: {
        name: "Roger",
      },
    }
  );
}

//updateDogs();
