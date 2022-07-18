import { shared } from "node-blox-sdk";
import { getBody } from "./utils.js";

const get_user_min_details = async (req, res) => {
  // health check
  if (req.params["health"] === "health") {
    res.write(JSON.stringify({ success: true, msg: "Health check success" }));
    res.end();
  }

  // Getting shared prisma client
  const { prisma } = await shared.getShared();

  const { system_user_id } = await getBody(req);
  const userData = await prisma.user.findUnique({
    where: {
      system_user_id,
    },
    select: {
      system_user_id: true,
      first_name: true,
      email: true,
    },
  });

  res.write(
    JSON.stringify({
      success: true,
      msg: `User retrieved succesfully`,
      data: userData,
    })
  );
  res.end();
};

export default get_user_min_details;
