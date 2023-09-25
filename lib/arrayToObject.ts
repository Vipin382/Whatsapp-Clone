type contacts = {
  about: string;
  createdAt: string;
  id: string;
  name: string;
  originalId: string;
  phone: string;
  profile: string | null;
  updatedAt: string;
  userId: string;
}[];

export interface IObjectComponent {
  alphabet: string;
  array: contacts;
}
export const arrayToObjectArray = (array: contacts) => {
  const alphabetGroup: { [key: string]: contacts } = {};

  array.forEach((item) => {
    const firstLetter = item.name[0].toLowerCase();

    if (!alphabetGroup[firstLetter]) {
      alphabetGroup[firstLetter] = [];
    }

    alphabetGroup[firstLetter].push(item);
  });

  const ContactListData: IObjectComponent[] = Object.entries(alphabetGroup).map(
    ([letter, array]) => ({
      alphabet: letter,
      array,
    })
  );

  return ContactListData;
};
