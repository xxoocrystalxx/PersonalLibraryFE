import { useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Text,
  Heading,
  Spacer,
  Badge,
  Icon,
  Button,
  Center,
  useToast,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { StarIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { RiMenLine, RiWomenLine, RiShieldUserLine } from "react-icons/ri";
import PropTypes from "prop-types";

const BookCard = ({ book, token, onEdit, onDelete }) => {
  return (
    <Flex
      key={book.id}
      shadow="md"
      borderWidth="1px"
      p={2}
      justifyContent="space-between"
      _hover={{ shadow: "xl" }}
      m={2}
      bg={book.saved ? "green.50" : "white"}
    >
      <Box alignItems={"flex-start"} flex="1">
        <Box display="flex" justifyContent="space-between">
          <Heading as="h4" size="md" p={1}>
            {book.title}
          </Heading>
          <Heading as="h4" size="md" p={1}>
            {book.time}
          </Heading>
        </Box>
        <Text fontSize="xs" color="gray.600" p={1}>
          <Icon as={RiMenLine} w={4} h={4} /> {book.male}
        </Text>
        <Text fontSize="xs" color="gray.600" pl={1}>
          <Icon as={RiWomenLine} w={4} h={4} /> {book.female}
        </Text>
        <Stack direction="row" p={1}>
          <Text
            fontSize="xs"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={RiShieldUserLine} w={4} h={4} mr={1} /> {book.author.name}
          </Text>
          <Spacer />
          {book.genres.map((g) => (
            <Badge variant="outline" colorScheme="cyan" key={g.name}>
              {g.name}
            </Badge>
          ))}
        </Stack>
      </Box>
      <Box alignItems={"flex-start"} flex="3">
        <Text fontSize="xs" noOfLines={[1, 2, 2]} color="gray.600" p={1}>
          {book.description}
        </Text>
        <Text color="red.300" fontSize="xs" p={1}>
          {book.comment}
        </Text>
        <Box display="flex" p={1} alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < book.rating ? "teal.500" : "gray.300"}
              />
            ))}
        </Box>
      </Box>
      {token && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <IconButton
            colorScheme="blue"
            icon={<EditIcon />}
            onClick={() => onEdit(book)}
          />
          <IconButton
            colorScheme="red"
            icon={<DeleteIcon />}
            onClick={() => onDelete(book)}
          />
        </Box>
      )}
    </Flex>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    male: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    female: PropTypes.string,
    description: PropTypes.string,
    comment: PropTypes.string,
    time: PropTypes.string,
    rating: PropTypes.number,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
    saved: PropTypes.bool,
    id: PropTypes.string,
  }),
  token: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
};

export default BookCard;
