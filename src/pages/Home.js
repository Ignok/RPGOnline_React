import React from "react";
import { useTranslation } from "react-i18next";



export default function Home() {

  const { t } = useTranslation();

  return (
    <div>
      <div className="titleheader">
        <h1>
          Nice Dice
          <span>PLAY RPG ONLINE</span>
        </h1>
      </div>
      <h1>{t('home.title')}</h1>
      <img
        className="scalable-photo"
        src={require("../helpers/pictures/homepage_bard.jpg")}
      />
      <h5 className="subheader">
        {t('home.content')}
      </h5>
    </div>
  );
}
