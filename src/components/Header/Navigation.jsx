import { Flex } from "@chakra-ui/react";
import { IoLibrary } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useUserInfo from "../../hooks/useUserInfo";
import Logo from "./Logo";
import MenuLinks from "./MenuLinks";
import SearchBar from "./SearchBar";
import PropTypes from "prop-types";
import Loader from "../Loader";

const Navigation = ({ setToken, refetch, authorRefetch }) => {
  let navigate = useNavigate();

  const { data, loading } = useUserInfo();

  const apolloClient = useApolloClient();

  if (loading) return <Loader />;

  const signOut = () => {
    setToken(null);
    localStorage.clear();
    apolloClient.resetStore();
    navigate("/");
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      w="100%"
      borderTop="3px solid"
      borderTopColor={"pink.400"}
      boxShadow="lg"
      mb={8}
      p={2}
      bg="white"
      sx={{
        position: "-webkit-sticky", //standar value
        WebkitPosition: "sticky", //for Safari
        top: "0",
      }}
      wrap={{ base: "wrap", md: "nowrap" }}
    >
      <Logo
        w="20%"
        bgGradient="linear(to-r, red.400, orange.300, pink.500,pink.100)"
        bgClip="text"
        name="CrystalSpace"
        icon={IoLibrary}
      />
      <SearchBar refetch={refetch} authorRefetch={authorRefetch} />
      {/* <MenuToggle toggle={toggle} isOpen={isOpen} /> */}
      <MenuLinks signOut={signOut} data={data} refetch={refetch} />
    </Flex>
  );
};

Navigation.propTypes = {
  setToken: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  authorRefetch: PropTypes.func.isRequired,
};

export default Navigation;
