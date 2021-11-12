import { Alert, AlertIcon, Kbd, Heading, ListItem, Text, UnorderedList, OrderedList, Box } from "@chakra-ui/react";
import React from "react";

export default function Babybo() {
    const headings = [{
        label: "Úvodní stránka",
        tag: "homepage"
    }]
    return (
        <Box pb="10" mb="10">
            <Heading>Úvodní stránka</Heading>
            <Text>
                Na úvodní stránce je přehled všech Babyboxů. Karta každého babyboxu obsahuje:
            </Text>
            <UnorderedList ml={10}>
                <ListItem>Titulek - název babyboxu</ListItem>
                <ListItem>Hvězdu - po kliknutí je možné tento babybox přidat do oblíbených, nebo zase odebrat</ListItem>
                <ListItem>Další informace - počet adres, poznámky, ...</ListItem>
                <ListItem>Tlačítko <b>Otevřít</b> - Otevře stránku daného Babyboxu se statistikami a dalšími možnostmi</ListItem>
                <ListItem>Tlačítko <b>Přidat adresy</b> - Otevře formulář pro přidávání adres</ListItem>
            </UnorderedList>
            <Text>
                Na této stránce je možné vytvořit nový Babybox pomocí tlačítka <b>+</b>, které je umístěno nahoře.
            </Text>



            <Heading mt="5">Přidání adresy</Heading>
            <Text>
                Otevření formuláře pro přidání adres je možné na hlavní stránce pomocí tlačítka <b>Přidat adresy</b> nebo po otevření stránky babyboxu pomocí tlačítka <b>Přidávat další adresy</b>.
            </Text>
            <Text>
                Všechna povinná pole ve formuláři je nutné vyplnit, tato pole jsou označená pomocí <Text as="span" fontSize="xl" color="tomato">*</Text> (Jméno a příjmení v obou pádech, pohlaví, název společnosti, email, ulici, město a PSČ).
            </Text>
            <Alert status="info" variant="left-accent" my="3">
                <AlertIcon />
                <span>Mezi jednotlivými poli je možné se přesouvat pomocí: <Kbd mx="2">Tab</Kbd> (pro procházení v opačném směru <Kbd ml={2}>Shift</Kbd> + <Kbd>Tab</Kbd>)</span>
            </Alert>
            <Text>Pokud je zadané jméno v databázi jmen, pak je automaticky převedeno na 5. pád. Pokud jméno není převedeno, pak je potřeba zkontrolovat, jestli je napsané správně (velké/malé písmena, diakritika), může se však stát, že je databáze neúplná a v takovém případě je nutné 5. pád vyplnit ručně.</Text>
            <Alert status="info" variant="left-accent" my="3">
                <AlertIcon />
                <span>Pro rychlejší a přesnější vyplňování jednotlivých polí je dobré používat zkratky na kopírování a vkládání - <Kbd>CTRL</Kbd> + <Kbd>C</Kbd> a <Kbd>CTRL</Kbd> + <Kbd>V</Kbd></span>
            </Alert>
            <Text>Není možné přidávat adresy, které jsou duplicitní. Duplicitní adresy se zobrazí v tabulce pod formulářem (pokud je vše ok, pak se tabulka nezobrazuje). Pokud se zobrazuje duplicitní adresa jsou dvě možnosti, jak to řešit:</Text>
            <UnorderedList ml="10">
                <ListItem>Adresu ve formuláři neukládat a pokračovat dalšími adresami</ListItem>
                <ListItem>Odstranit duplicitní adresu v tabulce pomocí červeného tlačítka koše a následně uložit adresu ve formuláři</ListItem>
            </UnorderedList>



            <Heading mt="5">Editování adresy</Heading>
            <Text>
                <span>
                    Editování adresy je možné po otevření Babyboxu -{">"} Otevřít databázi adres,
                    nebo při přidávání adresy je možné editovat duplicitní adresu.
                    Po stisku modrého tlačítka se otevře formulář pro editaci, kde je možné adresu editovat. Po provedení změn je potřeba je uložit pomocí tlačítka Editovat.
                    Pomocí tlačítka <b>Resetovat formulář</b> je možné vrátit adresu do původního stavu. Pomocí tlačítka <b>Storno</b> je pak možné editování zrušit.
                    <br />
                    Opět není možné editovat adresu tak, aby nově zeditovaná adresa byla duplicitní s jinou.
                </span>
            </Text>


            <Heading mt="5">Nahlášení chyby</Heading>
            <Text>
                <span>
                    Na každé stránce úplně dole v zápatí je odkaz na formulář pro nahlašování chyb.
                    V tomto formuláři se stačí řídit postupem, který je u něj napsaný.
                </span>
            </Text>
            <Text>
                <span>
                    Je tedy potřeba vyplnit tato pole:
                    <UnorderedList ml={10}>
                        <ListItem><b>Issue Title</b> - Pár slovy popsat problém</ListItem>
                        <ListItem><b>Details</b> - Podrobně popsat problém. Pokud se jedná o problém, který nastavá při nějaké opakované činnosti (např. nelze přidat nějaká adresa) je dobré do tohoto pole napsat, jak k chybě dochází a jak tuto chybu replikovat (jakým postupem chybu znovu vyvolat - např. jak vyplnit jednotlivá pole přidávání adres, aby došlo k chybě).</ListItem>
                        <ListItem>CATPCHA - Na konci formuláře je CAPTCHA - obrázek s políčkem, do kterého je potřeba opsat znaky, které jsou na obrázku.</ListItem>
                    </UnorderedList>
                    Celý formulář se pak odešle pomocí tlačítka <b>Submit</b>. Poté je možné tuto záložku s formulářem zavřít.
                </span>
            </Text>
            <Text mt={2}>
                <span>
                    Tímto způsobem je vhodné nahlašovat chyby, které jsou závážné, ale i úplné detaily, jako je například nějaký překlep v textu aplikaci atd. Tento postup je také vhodný pro navrhnutí vylepšení pro tuto aplikaci, nebo požádání o změnu.
                </span>
            </Text>
        </Box>
    )
}
