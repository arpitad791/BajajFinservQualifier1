const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const user = {
  fullName: "arpita_dhamange",
  dob: "27052004",
  email: "arpitad791@gmail.com",
  rollNumber: "22BEC0395",
};

app.use(express.json());

function alternateCapsReverse(arr) {
  const concatStr = arr.join("");
  const reversed = concatStr.split("").reverse();
  const result = reversed.map((char, index) =>
    index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
  );
  return result.join("");
}

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "'data' must be an array",
      });
    }

    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;

    data.forEach((item) => {
      const strItem = item.toString().trim();

      if (strItem !== "" && !isNaN(strItem)) {
        const num = parseInt(strItem, 10);
        sum += num;
        if (num % 2 === 0) {
          evenNumbers.push(strItem);
        } else {
          oddNumbers.push(strItem);
        }
      } else if (/^[a-zA-Z]+$/.test(strItem)) {
        alphabets.push(strItem.toUpperCase());
      } else {
        specialCharacters.push(strItem);
      }
    });
    
    res.status(200).json({
      is_success: true,
      user_id: `${user.fullName}_${user.dob}`,
      email: user.email,
      roll_number: user.rollNumber,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string: alternateCapsReverse(alphabets),
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Internal server error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`); 
});
