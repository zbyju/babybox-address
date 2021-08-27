import {Heading, ListItem, Text, UnorderedList} from "@chakra-ui/react";

export default function Babybo() {
    const headings = [{
        label: "Úvodní stránka",
        tag: "homepage"
    }]
    return (
        <>
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
        </>
    )
}
