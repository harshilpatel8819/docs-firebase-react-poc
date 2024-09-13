import { faker } from "@faker-js/faker";

export const useGetUser = () => {
  const user = sessionStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  // Check if the user is present and if it has both uuid and name properties
  if (
    !parsedUser ||
    !parsedUser.uuid ||
    !parsedUser.name ||
    !parsedUser.img ||
    !parsedUser.color
  ) {
    // Create a new user object if not present or if uuid or name is missing
    const newUser = {
      uuid: faker.string.uuid(),
      name: faker.animal.type(),
      img: `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${faker.seed()}`,
      color: faker.color.rgb(),
    };
    sessionStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
  }

  return parsedUser;
};
