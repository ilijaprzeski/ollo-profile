import ApolloClientProvider from './ApolloClientProvider';
import gql from "graphql-tag";
const client = ApolloClientProvider.client;

export const isSetupComplete = () => {
  const query = gql`{
    profile {
      setupComplete
    }
  }`;

  return new Promise((resolve, reject) => {
    client.query({query, fetchPolicy: "network-only"}).then(result => resolve(result.data.profile.setupComplete)).catch((ex)=> reject(ex));
  });
};

export const lookupMatchType = (includeInSearchFor, interestedIn) => {
  const validInput = ["Women", "Men", "Women & Men"];

  if (validInput.indexOf(includeInSearchFor) === -1) return null;
  if (validInput.indexOf(interestedIn) === -1) return null;

  if (includeInSearchFor === "Men") {
    if (interestedIn === "Men") return 1;
    if (interestedIn === "Women") return 2;
    if (interestedIn === "Women & Men") return 4;
  }
  if (includeInSearchFor === "Women") {
    if (interestedIn === "Men") return 8;
    if (interestedIn === "Women") return 16;
    if (interestedIn === "Women & Men") return 32;
  }
};

export const lookupDefaultGender = (includeInSearchFor) => {
  const validInput = ["Women", "Men"];

  if (validInput.indexOf(includeInSearchFor) === -1) return null;

  if (includeInSearchFor === "Men") return "Male";
  if (includeInSearchFor === "Women") return "Female";
};