import {
  Box,
  Center,
  Chip,
  Container,
  Grid,
  Group,
  Loader,
  NumberInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {useList, useUnit} from 'effector-react';
import React, {useEffect} from 'react';

export const SearchPage = () => {
  return (
    <Container size={900} my={40} w="100%">
      <Title
        align="center"
        sx={(theme) => ({fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})}
      >
        Find your recipe !
      </Title>
      <Box mt="lg">
        <SearchQuery />
        <MealTypes />
        <Calories />
        {/*
        <Group position="left" my="lg">
          <Text fz="md">Do you have allergies ?</Text>
          <Switch
            size="md"
            color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
            onLabel={<IconCheese size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />}
            offLabel={<IconMoodSad size="1rem" stroke={2.5} />}
          />
        </Group>


        <Group position="left" mt="lg">
          <MultiSelect
            w="100%"
            data={allergies}
            label="Choose allergies"
            placeholder="Pick all that you have"
          />
        </Group>
        */}

        {/*
        <Text fz="md">macronutrients</Text>
        <Group position="left" my="lg">
          {nutrients.macronutrients.map(({value, label}) => (
            <Popover width={300} position="bottom" shadow="md">
              <Popover.Target>
                <Button variant="light" {...(value === 'PROCNT' && {color: 'green'})}>
                  {label}
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Text size="xs" mb="md">
                  Choose minimum and maximum values for a desired nutrient per serving. For
                  individual foods, the default serving size is 100 g
                </Text>
                <NumberInput label="min" mb="xs" />
                <NumberInput label="max" />
              </Popover.Dropdown>
            </Popover>
          ))}
        </Group>

        <Text fz="md">micronutrients</Text>
        <Group position="left" my="lg">
          {nutrients.micronutrients.map(({value, label}) => (
            <Popover width={300} position="bottom" shadow="md">
              <Popover.Target>
                <Button variant="light" {...(value === 'PROCNT' && {color: 'green'})}>
                  {label}
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Text size="xs" mb="md">
                  Choose minimum and maximum values for a desired nutrient per serving. For
                  individual foods, the default serving size is 100 g
                </Text>
                <NumberInput label="min" mb="xs" />
                <NumberInput label="max" />
              </Popover.Dropdown>
            </Popover>
          ))}
        </Group>
        */}
      </Box>
      <ResultsLoader />
      <Results />
      <Box p="sm"></Box>
    </Container>
  );
};

function SearchQuery() {
  return (
    <Group position="left" my="lg">
      <TextInput
        w="100%"
        mt="lg"
        placeholder="type one or more keywords"
        label="Find by keyword"
        withAsterisk
      />
    </Group>
  );
}

function MealTypes() {
  return (
    <Group position="left" my="lg">
      <Text fz="md">meal types</Text>
    </Group>
  );
}

function Calories() {
  return (
    <Group position="left" my="lg">
      <NumberInput w="30%" defaultValue={100} placeholder="kcal" />
      <Text fz="md">kcal</Text>
    </Group>
  );
}

function ResultsLoader() {
  return null;
}

function Results() {
  return <Grid grow>{}</Grid>;
}
