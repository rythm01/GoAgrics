const express = require('express');
const router = express.Router();
const token = require('../helper/token');
const verifyToken = require('../middlewares/verifyToken');
const farmer = require('../Schemas/farmerSchema');
const labour = require('../Schemas/labourSchema');
const dealer = require('../Schemas/dealerSchema');

//img

const fetchToolImage = (toolName) => {
   const apiKey = '34626295-443adf06b9a7566f8f831d672';
   const defaultImageUrl = 'https://example.com/default-tool-image.jpg';
   const searchQuery = `${toolName}`;
   const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo`;

   return fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
         const matchingImages = data.hits.map(hit => hit.largeImageURL);
         console.log(matchingImages);
         if (matchingImages.length > 0) {
            return matchingImages[0];
         } else {
            return defaultImageUrl;
         }
      })
      .catch(error => {
         console.error(error);
         return defaultImageUrl;
      });
};

// user page login
router.post('/login', async (req, res) => {
   const { name, category, address, pincode, mobno } = req.body;

   if (!name || !category || !address || !pincode || !mobno) {
      res.status(404).send({ message: "Please enter valid details" });
   }
   if (pincode.length != 6) {
      res.status(404).send({ message: "Please enter valid pincode!" });
   }
   if (mobno.length != 10) {
      res.status(404).send({ message: "Please enter valid Mobile Number" });
   }
   else {
      if (category === "Farmer") {
         const user = new farmer({
            fname: name,
            category: category,
            address: address,
            pincode: pincode,
            phoneNo: mobno,
         });

         const result = await user.save();
         const accessToken = token.generateAccessToken(result._id);
         const refreshToken = token.generateRefreshToken(result._id);

         res.status(201).send({
            message: "Farmer registration done successfully",
            accessToken: accessToken,
            refreshToken: refreshToken
         });
      }
      else if (category === "Labour") {
         const user = new labour({
            lname: name,
            category: category,
            address: address,
            pincode: pincode,
            phoneNo: mobno,
         });

         const result = await user.save();
         const accessToken = token.generateAccessToken(result._id);
         const refreshToken = token.generateRefreshToken(result._id);

         res.status(201).send({
            message: "Labour registration done successfully",
            accessToken: accessToken,
            refreshToken: refreshToken
         });
      }
      else if (category === "Dealer") {
         const user = new dealer({
            dname: name,
            category: category,
            address: address,
            pincode: pincode,
            phoneNo: mobno,
         });

         const result = await user.save();
         const accessToken = token.generateAccessToken(result._id);
         const refreshToken = token.generateRefreshToken(result._id);

         res.status(201).send({
            message: "Dealer registration done successfully",
            accessToken: accessToken,
            refreshToken: refreshToken
         });
      }
      else {
         res.status(400).send({
            message: "Please select valid category"
         })
      }
   }
});

router
   .route('/labour')
   .post(postLabour)
   .get(getHomePageLD);

async function getHomePageLD(req, res) {
   // here we send home page of labour || dealer which contains wether & news etc detail only
   res.json({
      message: "Home page is Visible Fantastically"
   })
}

async function postLabour(req, res) {
   const { mobno, skill, price, isAvailable } = req.body;  // Array of Skills pending

   try {
      if (!skill && !price) {
         res.status(404).send({ msg: "Invalid Data" });
      }
      else {
         const User = await labour.find({ phoneNo: mobno });

         await labour.updateOne({ _id: User[0]._id }, {
            $set: {
               pricePerDay: price,
               isAvailable: isAvailable
            },
            $push: {
               "skills": {
                  "skillN": skill,
               }
            }
         });
      }
   } catch (error) {
      res.status(404).send({ msg: "Invalid Data" });
      console.log(error);
   }

}

router
   .route('/dealer')
   .post(postDealer)
   .get(getHomePageLD);

async function postDealer(req, res) {
   const { mobno, tools } = req.body;
   try {
      const img = await fetchToolImage(tools);
      // console.log(img); 
      const User = await dealer.find({ phoneNo: mobno });
      await dealer.updateOne({ _id: User[0]._id }, {
         $push: {
            "tools": { "img": img, "tname": tools }
         }
      });

   } catch (error) {
      console.log(error);
   }
}

router.route('/resetToken')
      .post(token.resetToken);

router
   .route('/farmer/work')
   .get(verifyToken, getLabours);

router
   .route('/farmer/deal')
   .get(verifyToken, getDeals);


async function getLabours(req, res) {
   try {
      const farmerCode = await farmer.find({}, { pincode: 1 });
      const labourDetails = await labour.find({ pincode: { $in: farmerCode.map(f => f.pincode) } })
      res.status(201).send(labourDetails);
   }
   catch (err) {
      console.log(err);
      res.status(404).json(
         {
            message: "Data not found"
         }
      )
   }
}

async function getDeals(req, res) {
   try {
      const farmerCode = await farmer.find({}, { pincode: 1 });
      const dealsDetails = await dealer.find({ pincode: { $in: farmerCode.map(f => f.pincode) } })
      res.status(201).send(dealsDetails);
   }
   catch(err){
      console.log(err);
      res.status(404).json(
         {
            message: "Data not Found"
         }
      )
   }
}
module.exports = router;