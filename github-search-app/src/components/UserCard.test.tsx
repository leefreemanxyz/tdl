import { act, render } from "@testing-library/react";
import UserCard from "./UserCard";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";
jest.mock("axios");

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("UserCard", () => {
  it("snapshot", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          avatar_url: "src/img.jpg",
          login: "leefreemanxyz",
          name: "Lee Freeman",
          location: "Amsterdam",
          bio: undefined,
          twitter_username: "leefreemanxyz",
          followers: 27,
          following: 28,
          public_repos: 29,
          public_gists: 30,
          html_url: "https://github.com/leefreemanxyz",
          blog: "https://leefreeman.xyz",
        },
      })
    );
    let result;
    await act(async () => {
      result = await render(
        <Wrapper>
          <UserCard username="leefreemanxyz" />
        </Wrapper>
      );
    });
    const { container } = result;
    expect(container).toMatchSnapshot();
  });
});
