import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

const StyledTouchableOpacity = styled(TouchableOpacity)``;

const StyledView = styled(View)`
  flex-direction: row;
  background-color: #fff;
  min-width: 100%;
  max-width: 100%;
  padding-top: 9px;
  padding-left: 19px;
  font-size: 12px;
  line-height: 16px;
`;

const StyledText = styled(Text)`
  color: #bdbdbd;
  letter-spacing: 0.4px;
`;

const StyledTextSeparator = styled(StyledText)`
  padding-left: 8px;
  padding-right: 8px;
`;

const BreadcrumbItem = ({ title }: { title: string }) => (
  <StyledText>{title}</StyledText>
);

const BreadcrumbSeparator = ({ separator }: { separator: string }) => (
  <StyledTextSeparator>{separator}</StyledTextSeparator>
);

const BreadcrumbCollapser = () => <StyledText>...</StyledText>;

const max = 4;

interface Props {
  separator: string;
  titles: string[];
}

const Breadcrumbs = ({ separator, titles }: Props) => {
  let breadcrumbs = titles.map((title) => <BreadcrumbItem title={title} />);

  const totalItems = breadcrumbs.length;
  const lastIndex = totalItems - 1;

  if (totalItems > max) {
    breadcrumbs = [
      breadcrumbs[0],
      <BreadcrumbCollapser />,
      breadcrumbs[lastIndex],
    ];
  }

  let i = 1;
  while (i < breadcrumbs.length) {
    breadcrumbs.splice(i, 0, <BreadcrumbSeparator separator={separator} />);
    i += 2;
  }

  return (
    <StyledTouchableOpacity
      onPress={() => console.log("Esto va a abrir toda la navegación")}
    >
      <StyledView>{breadcrumbs}</StyledView>
    </StyledTouchableOpacity>
  );
};

export default Breadcrumbs;
