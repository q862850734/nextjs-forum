import { useTabsList } from "@mui/base";
import { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Box,
  Typography,
  MenuItem,
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
} from "@mui/material";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function TagsInput({ tags: tagList }) {
  return (
    <Autocomplete
      multiple
      options={tagList.map((option) => option.name)}
      defaultValue={[tagList[0].name]}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip
            key={index}
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label="freeSolo"
          placeholder="Favorites"
        />
      )}
    />
  );
}
