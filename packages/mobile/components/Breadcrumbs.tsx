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
      breadcrumbText = `${titles[0]}  ${separator}   ...   ${separator}  ${
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
  const shortestTitleLength = Math.min(firstTitleLength, lastTitleLength);
  const dotsAndSeparator = `  ${separator}  ...  ${separator}  `;
  const maxTitleLength = (maxChars - dotsAndSeparator.length) / 2 - 3;

  if (shortestTitleLength > maxTitleLength) {
    return `${firstTitle.substr(
      0,
      maxTitleLength
    )}...${dotsAndSeparator}${lastTitle.substr(0, maxTitleLength)}...`;
  } else if (firstTitleLength >= maxTitleLength) {
    return `${firstTitle.substr(
      0,
      maxChars - lastTitleLength - 14 - separator.length
    )}...${dotsAndSeparator}${lastTitle}`;
  } else {
    return `${firstTitle}${dotsAndSeparator}${lastTitle.substr(
      0,
      maxChars - firstTitleLength - 14 - separator.length
    )}...`;
  }
}

const max = 4;
const maxChars = 60;

interface Props {
  separator: string;
  titles: string[];
}

const StyledText = styled(Text)`
  font-size: 12px;
  padding: 16px;
  color: #bdbdbd;
`;

export default Breadcrumbs;
