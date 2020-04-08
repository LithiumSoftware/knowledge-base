import * as React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useState, useEffect } from "react";

import styled from "styled-components";
import { ActivityIndicator } from "react-native-paper";
import { View, Text, SafeAreaView, Button } from "react-native";
import moment from "moment";
import Breadcrumbs from "./Breadcrumbs";
import RichTextEditor from "./RichTextEditor";

import ARTICLES_QUERY from "../../kbcore/dist/queries/ARTICLES_QUERY";
import UPDATE_ARTICLE_MUTATION from "../../kbcore/dist/mutations/UPDATE_ARTICLE_MUTATION";

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  background: #fff;
`;

//Hardcoded code for demo -------------------------------------------------------------------------
const hardcodedArticlesWithParents = [
  {
    id: 2,
    title: "País",
    icon: "🌎",
    content:
      "<p>Comunidad social con una organización política común y un territorio y órganos de gobierno propios que es soberana e independiente políticamente de otras comunidades.</p>",
    parentId: null,
    authorId: 1,
    createdAt: Date.now,
    updatedAt: Date.now,
  },
  {
    id: 3,
    title: "Ciudad",
    icon: "🏙",
    content:
      "<p>Población donde habita un conjunto de personas que se dedican principalmente a actividades industriales y comerciales.</p>",
    parentId: null,
    authorId: 1,
    createdAt: Date.now,
    updatedAt: Date.now,
  },
  {
    id: 4,
    title: "Barrio",
    icon: "🏘",
    content:
      "<p>Parte de una población de extensión relativamente grande, que contiene un agrupamiento social espontáneo y que tiene un carácter peculiar, físico, social, económico o étnico por el que se identifica.</p>",
    parentId: null,
    authorId: 1,
    createdAt: Date.now,
    updatedAt: Date.now,
  },
];
//Hardcoded code for demo -------------------------------------------------------------------------

const StyledButton = styled(Text)`
  width: 335px;
  height: 42px;
  left: 20px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #bdbdbd;
`;

const TitleText = styled(Text)`
  text-align: center;
  color: #424242;
  font-weight: bold;
  padding-top: 16px;
  font-size: 40px;
`;

const TopBar = styled(View)`
  display: flex;
  position: absolute;
  left: 0;
  top: 64px;
  padding-top: 12px;
  z-index: 1050;
  width: 80%;
  justify-content: space-between;
  padding-left: 255px;
  padding-right: 20px;
  background-color: #fffff;
`;

const StyledLoadingView = styled(View)`
  width: 100%;
  height: 100%;
  display: flex;
  justifycontent: center;
  alignitems: center;
`;

const ArticleContent = (
  { articleId }: { articleId: number },
  { route, navigation }: { route: any; navigation: any }
) => {
  // const articleWithParents = useQuery(ARTICLES_QUERY, {
  //   variables: { id: articleId },
  // });
  //
  // const [updateArticle] = useMutation(UPDATE_ARTICLE_MUTATION);
  //
  // const [updatedTime, setUpdatedTime] = useState(
  //   articleWithParents.data?.getArticleWithParents[
  //     articleWithParents.data?.getArticleWithParents.length - 1
  //   ]?.updatedAt !==
  //     articleWithParents.data?.getArticleWithParents[
  //       articleWithParents.data?.getArticleWithParents.length - 1
  //     ]?.createdAt
  //     ? articleWithParents.data?.getArticleWithParents[
  //         articleWithParents.data?.getArticleWithParents.length - 1
  //       ]?.updatedAt
  //     : null
  // );
  //
  // const [lastModificationTime, setLastModificationTime] = useState(
  //   moment(updatedTime).fromNow()
  // );
  //
  // useEffect(() => {
  //   setLastModificationTime(moment(updatedTime).fromNow());
  //   setUpdatedTime(
  //     articleWithParents.data?.getArticleWithParents[
  //       articleWithParents.data?.getArticleWithParents.length - 1
  //     ]?.updatedAt !==
  //       articleWithParents.data?.getArticleWithParents[
  //         articleWithParents.data?.getArticleWithParents.length - 1
  //       ]?.createdAt
  //       ? articleWithParents.data?.getArticleWithParents[
  //           articleWithParents.data?.getArticleWithParents.length - 1
  //         ]?.updatedAt
  //       : null
  //   );
  //   const timeOut = setInterval(() => {
  //     setLastModificationTime(moment(updatedTime).fromNow());
  //   }, 15 * 1000);
  //   return () => {
  //     clearInterval(timeOut);
  //   };
  // }, [
  //   updatedTime,
  //   articleWithParents.data?.getArticleWithParents[
  //     articleWithParents.data?.getArticleWithParents.length - 1
  //   ]?.updatedAt,
  // ]);
  //
  // const onSave = (newContent: String) => {
  //   updateArticle({
  //     variables: {
  //       newContent: newContent,
  //       articleId:
  //         articleWithParents.data?.getArticleWithParents[
  //           articleWithParents.data?.getArticleWithParents.length - 1
  //         ]?.id,
  //     },
  //   }).then((data) => {
  //     setUpdatedTime(data.data.updateArticle.updatedAt);
  //   });
  // };
  //
  // return articleWithParents.loading ? (
  //   <StyledLoadingView>
  //     <ActivityIndicator color="primary" />
  //   </StyledLoadingView>
  // ) : (
  //   <View>
  //     <TopBar>
  //       <Breadcrumbs
  //         separator="/"
  //         items={articleWithParents.data?.getArticleWithParents?.map(
  //           (article: { title: String }) => ({
  //             title: article.title,
  //             action: navigation.push(article.title),
  //           })
  //         )}
  //       />
  //       {!lastModificationTime.includes("Invalid") && (
  //         <StyledButton color="secondary">
  //           Last modified {lastModificationTime}
  //         </StyledButton>
  //       )}
  //     </TopBar>
  //     <TitleText>
  //       {
  //         articleWithParents.data?.getArticleWithParents[
  //           articleWithParents.data?.getArticleWithParents.length - 1
  //         ]?.title
  //       }
  //     </TitleText>
  //     <RichTextEditor
  //       content={
  //         articleWithParents.data?.getArticleWithParents[
  //           articleWithParents.data?.getArticleWithParents.length - 1
  //         ]?.content
  //       }
  //       onSave={onSave}
  //     />
  //   </View>
  // );
  //Hardcoded code for demo -------------------------------------------------------------------------

  const articleWithParents = hardcodedArticlesWithParents;

  const [updatedTime, setUpdatedTime] = useState(
    articleWithParents[articleWithParents.length - 1]?.updatedAt !==
      articleWithParents[articleWithParents.length - 1]?.createdAt
      ? articleWithParents[articleWithParents.length - 1]?.updatedAt
      : undefined
  );

  const [lastModificationTime, setLastModificationTime] = useState(
    moment(updatedTime).fromNow()
  );

  useEffect(() => {
    setLastModificationTime(moment(updatedTime).fromNow());
    setUpdatedTime(
      articleWithParents[articleWithParents.length - 1]?.updatedAt !==
        articleWithParents[articleWithParents.length - 1]?.createdAt
        ? articleWithParents[articleWithParents.length - 1]?.updatedAt
        : undefined
    );
    const timeOut = setInterval(() => {
      setLastModificationTime(moment(updatedTime).fromNow());
    }, 15 * 1000);
    return () => {
      clearInterval(timeOut);
    };
  }, [
    updatedTime,
    articleWithParents[articleWithParents.length - 1]?.updatedAt,
  ]);

  const onSave = (newContent: string) => {
    articleWithParents[2].content = newContent;
    articleWithParents[2].updatedAt = Date.now;
    setUpdatedTime(articleWithParents[2].updatedAt);
  };
  //Hardcoded code for demo -------------------------------------------------------------------------

  return (
    <StyledSafeAreaView>
      <Breadcrumbs
        separator=" / "
        items={articleWithParents?.map((article) => ({
          title: article.title,
          action: console.log(article.title),
        }))}
      />
      <TitleText>
        {articleWithParents[articleWithParents.length - 1]?.title}
      </TitleText>
      <RichTextEditor
        content={articleWithParents[articleWithParents.length - 1]?.content}
        onSave={onSave}
      />
      {!lastModificationTime.includes("Invalid") && (
        <StyledButton>Last modified {lastModificationTime}</StyledButton>
      )}
    </StyledSafeAreaView>
  );
};

export default ArticleContent;
