import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

const MenuBar = ({ data = [], buttonIcon = "", item = [], ...rest }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={buttonIcon}
        variant="outline"
        {...rest}
      />
      <MenuList>
        {data.map(({ icon = "", name, onClick = "" }, index) => (
          <MenuItem key={index} icon={icon} onClick={() => onClick(item)}>
            {name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default MenuBar;
