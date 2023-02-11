import React from 'react'
import Footer from '../components/footer'
import Icon from '../components/icons'

//właściwe tworzenie stopki
export function FooterContainer() {
    return(
        <Footer>
            <Footer.Wrapper>
                <Footer.Row>
                    <Footer.Column>
                        <Footer.Title>&copy; NICE DICE</Footer.Title>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>About</Footer.Title>
                        <Footer.Link href="#">Our story</Footer.Link>
                        <Footer.Link href="#">Plans for the future</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Contact</Footer.Title>
                        <Footer.Link href="#">Support</Footer.Link>
                        <Footer.Link href="#">FAQ</Footer.Link>
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