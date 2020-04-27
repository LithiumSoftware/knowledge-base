import React from "react";
import { Text } from "react-native";
import styled from "styled-components";

const Breadcrumbs = ({ separator, titles }: Props) => {
  const totalItems = titles.length;

  let breadcrumbText = titles[0];

  if (titles.length > 1) {
    breadcrumbText += titles
      .slice(1)
      .map((title: string) => `  ${separator}  ${title}`)
      .join("");

    if (totalItems > max || breadcrumbText.length >= maxChars) {
      breadcrumbText = `${titles[0]}  ${separator}  ${
        titles[titles.length - 1]
      }`;
    }

    if (breadcrumbText.length >= maxChars) {
      breadcrumbText = cutText(titles, separator);
    }
  }

  return <StyledText numberOfLines={1}>{breadcrumbText}</StyledText>;
};

function cutText(titles: string[], separator: string) {
  const titlesLenght = titles.length;
  const firstTitle = titles[0];
  const lastTitle = titles[titlesLenght - 1];
  const firstTitleLength = firstTitle.length;
  const lastTitleLength = lastTitle.length;
  console.log("BRUNOPINTOS: first: " + firstTitleLength);
  console.log("BRUNOPINTOS: last: " + lastTitleLength);
  console.log(
    "BRUNOPINTOS: todo: " +
      (firstTitleLength + lastTitleLength + 4 + separator.length) +
      " = " +
      maxChars
  );
  const shortestTitleLength = Math.min(firstTitleLength, lastTitleLength);
  const maxTitleLength = (maxChars - 4 - separator.length) / 2 - 3;

  if (shortestTitleLength >= maxTitleLength) {
    return `${firstTitle.substr(
      0,
      maxTitleLength
    )}...  ${separator}  ${lastTitle.substr(0, maxTitleLength)}...`;
  } else if (firstTitleLength >= maxTitleLength) {
    return `${firstTitle.substr(
      0,
      maxChars - lastTitleLength - 7 - separator.length
    )}...  ${separator}  ${lastTitle}`;
  } else {
    return `${firstTitle}  ${separator}  ${lastTitle.substr(
      0,
      maxChars - firstTitleLength - 7 - separator.length
    )}...`;
  }
}

const max = 4;
const maxChars = 56;

interface Props {
  separator: string;
  titles: string[];
}

const StyledText = styled(Text)`
  display: flex;
  font-size: 12px;
  padding: 16px;
  color: #bdbdbd;
`;

export default Breadcrumbs;
