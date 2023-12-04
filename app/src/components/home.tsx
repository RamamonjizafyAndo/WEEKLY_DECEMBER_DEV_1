import { SetStateAction, useState } from 'react';
import { Button, Card, Container, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useHttps from '../shared/useHttp'
import Form from 'react-bootstrap/Form';
import france from "../assets/france.png"
import anglais from "../assets/royaume-uni.png"
import axios from 'axios';

export const Home = () => {
    const { i18n, t } = useTranslation();
    const [langage, setLangage] = useState("Français");
    const [txt, setTxt] = useState("");
    const onChangeLangage = (eventKey: any) => {
        setLangage(eventKey);
        if (eventKey == "Français") {
            i18n.changeLanguage('fr');
        }
        else {
            i18n.changeLanguage('en');
        }
    }

    const https = axios.create({
        baseURL:"http://localhost:3000/api",
        headers: {
          "Content-Type": "application/json",
        },
      });

      
    const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTxt(event.target.value);
      };

    
    const valider = async (event: any) => {
        let lang;
        if (langage == "Français"){
            lang = 'fr'
        }
        else{
            lang = 'en'
        }
        https.post('/analyse', {
            phrase: txt,
            langue: lang
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    };
    return (
        <Container>
            <Card>
                <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                        {t('verification')}
                    </span>
                    <span>
                        {t('langue')}
                        <Dropdown onSelect={onChangeLangage}>
                            <Dropdown.Toggle variant="light" className="custom-dropdown-toggle">
                                {langage}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="custom-dropdown-menu">
                                <Dropdown.Item key="Français" eventKey="Français"><img src={france} alt="" width={20} height={20} /> Francais</Dropdown.Item>
                                <Dropdown.Item key="Anglais" eventKey="Anglais"><img src={anglais} alt="" width={20} height={20} /> Anglais</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </span>
                </Card.Header>

                <Card.Body>
                    <Form onSubmit={valider}>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>{t('texte')}</Form.Label>
                                <Form.Control value={txt} onChange={onChangeText} as="textarea" rows={5} autoComplete='off' spellCheck={false} />
                            </Form.Group>
                        </Card.Text>
                        <Button type="submit" variant="primary">{t('button')}</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}