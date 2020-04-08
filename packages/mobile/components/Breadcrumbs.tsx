import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

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

const BreadcrumbItem = ({ title, action }: { title: string; action: any }) => (
  <StyledText onPress={action}>{title}</StyledText>
);

const BreadcrumbSeparator = ({ separator }: { separator: string }) => (
  <StyledText>{separator}</StyledText>
);

const BreadcrumbCollapser = () => (
  <StyledText
    onPress={() => console.log("ESTO VA A ABRIR LA NAVEGACIÓN EN UN MODAL")}
  >
    ...
  </StyledText>
);

const Breadcrumbs = ({
  separator,
  items,
}: {
  separator: string;
  items: { title: string; action: any }[];
}) => {
  let breadcrumbs = items.map(({ title, action }) => (
    <BreadcrumbItem title={title} action={action} />
  ));

  const max = 4;

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

  return <StyledView>{breadcrumbs}</StyledView>;
};

export default Breadcrumbs;
