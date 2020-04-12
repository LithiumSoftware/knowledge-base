import * as React from "react";
import { useState, useEffect } from "react";

import styled from "styled-components";
import { View, Text, SafeAreaView, Button } from "react-native";
import moment from "moment";
import Breadcrumbs from "./Breadcrumbs";
import ArticleEditor from "./ArticleEditor";

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
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 3,
    title: "Ciudad",
    icon: "🏙",
    content:
      "<p>Población donde habita un conjunto de personas que se dedican principalmente a actividades industriales y comerciales.</p>",
    parentId: null,
    authorId: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 4,
    title: "Barrio",
    icon: "🏘",
    content:
      "<p>Parte de una población de extensión relativamente grande, que contiene un agrupamiento social espontáneo y que tiene un carácter peculiar, físico, social, económico o étnico por el que se identifica.</p>",
    parentId: null,
    authorId: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];
//Hardcoded code for demo -------------------------------------------------------------------------

const StyledText = styled(Text)`
  width: 335px;
  height: 42px;
  left: 20px;

  font-size: 12px;
  line-height: 20px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #bdbdbd;
`;

const TitleText = styled(Text)`
  width: 100%;
  padding-top: 36px;
  left: 19px;
  font-weight: bold;
  font-size: 48px;
  letter-spacing: -1.5px;
  color: rgba(0, 0, 0, 0.87);
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
    updatedTime ? moment(updatedTime).fromNow() : null
  );

  useEffect(() => {
    setLastModificationTime(updatedTime ? moment(updatedTime).fromNow() : null);
    setUpdatedTime(
      articleWithParents[articleWithParents.length - 1]?.updatedAt !==
        articleWithParents[articleWithParents.length - 1]?.createdAt
        ? articleWithParents[articleWithParents.length - 1]?.updatedAt
        : undefined
    );
    const timeOut = setInterval(() => {
      console.log(updatedTime ? moment(updatedTime).fromNow() : null);
      setLastModificationTime(
        updatedTime ? moment(updatedTime).fromNow() : null
      );
    }, 15 * 1000);
    return () => {
      clearInterval(timeOut);
    };
  }, [
    updatedTime,
    articleWithParents[articleWithParents.length - 1]?.updatedAt
  ]);

  const onSave = (newContent: string) => {
    console.log(newContent);
    articleWithParents[2].content = newContent;
    articleWithParents[2].updatedAt = Date.now();
    console.log(articleWithParents[2].updatedAt);
    console.log(updatedTime ? moment(updatedTime).fromNow() : null);
    setUpdatedTime(articleWithParents[2].updatedAt);
    setLastModificationTime(updatedTime ? moment(updatedTime).fromNow() : null);
  };
  //Hardcoded code for demo -------------------------------------------------------------------------

  return (
    <StyledSafeAreaView>
      <Breadcrumbs
        separator="/"
        items={articleWithParents?.map(article => ({
          title: article.title
        }))}
      />
      <TitleText>
        {/* {articleWithParents[articleWithParents.length - 1]?.title} */}
        Introduccion a React Native
      </TitleText>
      <ArticleEditor
        content={articleWithParents[articleWithParents.length - 1]?.content}
        onSave={onSave}
      />
      {lastModificationTime && !lastModificationTime?.includes("Invalid") && (
        <StyledText onPress={() => console.log(lastModificationTime)}>
          Last modified {lastModificationTime}
        </StyledText>
      )}
    </StyledSafeAreaView>
  );
};

export default ArticleContent;
