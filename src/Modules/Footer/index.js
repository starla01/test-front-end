// Librerías
import React, { useState } from 'react';

// Components
import { Button } from '../../Components/Button';
import TextField from '../../Components/TextField';

// Estilos
import styles from './index.module.sass';

// Hooks
import useInput from '../../Hooks/useInput';

// Constantes
import { BLUR, PHONE } from '../../constants';

// Iconos
import { ReactComponent as AudioIcon } from '../../Components/Icons/audio.svg';
import { ReactComponent as EmailIcon } from '../../Components/Icons/email.svg';
import { ReactComponent as LogoIcon } from '../../Components/Icons/logo-icon-white.svg';
import { ReactComponent as VtexIcon } from '../../Components/Icons/vtex-logo.svg';

/**
 * Footer Component
 *
 * @name Footer
 * @description Componente para renderizar Cajas de entradas de Texto
 *
 *
 * @param {Objet} params props del componente React
 * @param {Number} params.screenSize Propiedad que contiene el nombre del breackpoin para el ancho de la pantall actual
 *
 * @example
 *
 *     <Footer screenSize={screenSize} />
 *
 * @returns {React.Component}
 */

export default function Footer({ screenSize }) {
  const isPhone = PHONE === screenSize;
  const [sendData, setSendData] = useState(false);
  const name = useInput({
    id: 'name',
    name: 'name',
    value: '',
    required: true,
    errors: {
      requiredError: 'Preencha com seu nome completo',
      defaultError: 'Preencha com seu nome completo',
    },
    placeholder: 'Fernando Robles',
    validateEvent: BLUR,
    regexpOverwrite: /[A-Za-zÁ-Úá-ú ]+/,
  });

  const email = useInput({
    id: 'email',
    name: 'email',
    value: '',
    required: true,
    validateEvent: 'blur',
    regexp: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    placeholder: 'email@email.com',
    errors: {
      requiredError: 'Preencha com um e-mail válido',
      defaultError: 'Preencha com um e-mail válido',
    },
  });

  const validateData = useInput.validateData;

  function handleSubmitContact() {
    const { errors } = validateData([name, email]);

    if (!errors || !errors.length) {
      setSendData(true);
      return fetch('https://corebiz-test.herokuapp.com/api/v1/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          email: email.input.input.value,
          name: name.input.input.value,
        }),
      });
    } else console.log('Mensaje de error');
  }

  function handledNovoEmail() {
    setSendData(false);
  }

  return (
    <div className={`${styles.container} ${(isPhone && styles.phone) || ''}`}>
      <div className={`${styles.containerTop} ${(isPhone && styles.phone) || ''}`}>
        <div className={styles.top}>
          {(!sendData && (
            <>
              <div className={styles.titleContact}>
                Participe de nossas news com promoções e novidades!
              </div>
              <div className={`${styles.controls} ${(isPhone && styles.phone) || ''}`}>
                <div className={styles.inputFiled}>
                  <TextField
                    className={styles.textFieldName}
                    label=" Digite seu nome"
                    input={name.input}
                  />
                </div>
                <div className={styles.inputFiled}>
                  <TextField
                    className={styles.textFieldEmail}
                    label="Digite seu email"
                    input={email.input}
                  />
                </div>
                <div className={styles.inputButton}>
                  <Button
                    type="primary"
                    classname={styles.classButton}
                    onClick={handleSubmitContact}>
                    <span className={styles.bigTextButton}> Eu quero!</span>
                  </Button>
                </div>
              </div>
            </>
          )) || (
            <>
              <h3>Seu e-mail foi cadastrado com sucesso! </h3>
              <h5>A partir de agora você receberá as novidade e ofertas exclusivas.</h5>
              <div className={styles.inputButton}>
                <Button
                  type="primary"
                  classname={`${styles.classButton} ${styles.novoEmail} ${
                    (isPhone && styles.phone) || ''
                  }`}
                  onClick={handledNovoEmail}>
                  <span className={styles.bigTextButton}>{`Cadastrar novo e-mail`}</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={`${styles.containerBottom} ${(isPhone && styles.phone) || ''}`}>
        <div className={`${styles.bottom} ${(isPhone && styles.phone) || ''}`}>
          <div id={styles.addressInfo} className={styles.block}>
            <h2 className={styles.title}>Localização</h2>
            <div className={styles.assetLine}></div>
            <div className={styles.address}>
              <p>Avenida Andrômeda, 2000. Bloco 6 e 8 </p>
              <p>Alphavile SP </p>
              <p>brasil@corebiz.ag </p>
              <p>+55 11 3090 1039</p>
            </div>
          </div>
          <div id={styles.contactInfo} className={styles.block}>
            <Button type="secondary" classname={styles.classButton}>
              <EmailIcon className={styles.iconButtonMail} />
              <span className={styles.textButton}>ENTRE EM CONTATO</span>
            </Button>
            <Button type="secondary" classname={styles.classButton}>
              <AudioIcon className={styles.iconButtonAudio} />
              <span className={styles.textButton}>FALE COM O NOSSO CONSULTOR ONLINE</span>
            </Button>
          </div>
          <div id={styles.enterpriseInfo} className={styles.block}>
            <div className={styles.enteprise}>
              <p className={styles.smallTitle}>Created by</p>
              <LogoIcon />
            </div>
            <div className={styles.enteprise}>
              <p className={styles.smallTitle}>Powered by</p>
              <VtexIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
