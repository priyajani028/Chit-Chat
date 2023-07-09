const Messages= require("../model/messageModel");

// module.exports.addMessage=async(req,res,next)=>{
// try{
//     const {from, to, message} = req.body;
//     const data=await Messages.create({
//         message:{text:message},
//         users:[from,to],
//         sender: from,
//     });
//     if(data)return res.json({msg:"Message added successfully"});
//     else return res.json({msg: "Failed to add message to the database"});
// }
// catch(ex){
//     next(ex);
// }
// };


module.exports.addMessage = async (req, res, next) => {
    try {
      const { from, to, message, photo } = req.body;
  
      const newMessage = {
        message: {
          text: message,
          photo: {
            data: Buffer.from(photo, 'base64'),
            contentType: 'image/png', // Update with the appropriate MIME type of the image
          },
        },
        users: [from, to],
        sender: from,
      };
  
      const data = await Message.create(newMessage);
      if (data) {
        return res.json({ msg: "Message added successfully" });
      } else {
        return res.json({ msg: "Failed to add message to the database" });
      }
    } catch (ex) {
      next(ex);
    }
  };

module.exports.getAllMessages= async(req,res,next)=>{
    try{
        const {from , to} = req.body;
        const messages= await Messages.find({
            users:{
                $all:[from, to],
            },
        }).sort({updatedAt:1});
        const projectMessages =messages.map((msg)=>{
            return{
                fromSelf: msg.sender.toString()===from,
                message:msg.message.text,
            };
        });
        res.json(projectMessages);
    }
    catch(ex){
        next(ex);
    }
};


module.exports.addPhotoMessage = async (req, res, next) => {
    try {
      const { from, to, message } = req.body;
      const file = req.file; // Access the uploaded file
      const photoUrl = `http://localhost:5000/${file.path}`; // Construct the photo URL based on the file path
      const data = await Messages.create({
        message: { text: message, photoUrl }, // Save the photo URL along with the message
        users: [from, to],
        sender: from,
      });
      if (data) return res.json({ msg: 'Message with photo added successfully' });
      else return res.json({ msg: 'Failed to add message with photo to the database' });
    } catch (ex) {
      next(ex);
    }
  };