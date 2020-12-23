import axios from "axios";
import { createTimestamps } from "./timestamp";

export class Github {
  @createTimestamps("Search users")
  async searchUsers(q: string) {
    return await axios.get(`https://api.github.com/search/users?${q}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN!}`,
      },
    });
  }

  @createTimestamps("Get user detail")
  async getUser(id: string) {
    return await axios.get(`https://api.github.com/users/${id}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN!}`,
      },
    });
  }
}
