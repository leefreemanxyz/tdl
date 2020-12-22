import { BadRequestError } from "@lfxyz/common";
import axios from "axios";
import { createTimestamps } from "./timestamp";

export class Github {
  @createTimestamps("Search users")
  async searchUsers(q: string) {
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/users?${q}`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN!}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestError("Oops");
    }
  }
  @createTimestamps("Get user detail")
  async getUser(id: string) {
    try {
      const { data } = await axios.get(`https://api.github.com/users/${id}`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN!}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestError("Oops");
    }
  }
}
