import React from 'react'
import Footer from '../footer'
import Icon from '../icons'
import { useTranslation } from "react-i18next";

export function FooterContainer() {
    const { t } = useTranslation();
    return(
        <Footer>
            <Footer.Wrapper>
                <Footer.Row>
                    <Footer.Column>
                        <Footer.Title>&copy; NICE DICE</Footer.Title>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>{t('footer.about.title')}</Footer.Title>
                        <Footer.Link href="#">{t('footer.about.our_story')}</Footer.Link>
                        <Footer.Link href="#">{t('footer.about.plans_for_the_future')}</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>{t('footer.contact.title')}</Footer.Title>
                        <Footer.Link href="#">{t('footer.contact.Support')}</Footer.Link>
                        <Footer.Link href="#">{t('footer.contact.FAQ')}</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Social</Footer.Title>
                        <Footer.Link href="#"><Icon className="fab fa-facebook-f" />Facebook</Footer.Link>
                        <Footer.Link href="#"><Icon className="fab fa-twitter" />Twitter</Footer.Link>
                        <Footer.Link href="#"><Icon className="fab fa-instagram" />Instagram</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Julia Akahori</Footer.Title>
                        <Footer.Link href="https://github.com/szezlong" rel="noreferrer" target="_blank">@s20936</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Ignacy Bok</Footer.Title>
                        <Footer.Link href="https://github.com/Ignok" rel="noreferrer" target="_blank">@s20833</Footer.Link>
                    </Footer.Column>
                </Footer.Row>
            </Footer.Wrapper>
        </Footer>
    )
}