import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import axios from "axios";

const filter = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.name
});

export default function SubmitForm() {
    const [open, setOpen] = useState(false); // if dropdown open?

    const [value, setValue] = useState([]);
    const [openDialog, openDialogOpen] = useState(false);

    const [data, setData] = useState([]);

    const loading = open && data.length === 0; // is it still loading

    // Axios Shit goes here
    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            console.log("I entered...");
            const config = {
                method: "post",
                url: "http://localhost:5000/getColors"
            };

            axios(config)
                .then(function (response) {
                    response.data = response.data.filter((category) => category.title);
                    console.log('response.data');
                    console.log(response.data);
                    if (active) {
                        setData(response.data);
                        console.log('data when active is true.');
                        console.log(data);
                    } else { console.log("This is not active."); }
                })
                .catch(function (error) {
                    console.log(error);
                });
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    // end of axios shit

    const handleClose = () => {
        setDialogValue({
            name: "",
            slug: "",
            image: ""
        });

        openDialogOpen(false);
    };

    const [dialogValue, setDialogValue] = useState({
        name: "",
        slug: "",
        image: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setValue([
            ...value,
            {
                name: dialogValue.name,
                slug: dialogValue.slug,
                image: dialogValue.image
            }
        ]);

        setData([
            ...data,
            {
                name: dialogValue.name,
                slug: dialogValue.slug,
                image: dialogValue.image
            }
        ]);

        handleClose();
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(value);
        console.log(event);
    };

    return (
        <React.Fragment>
            <form onSubmit={handleFormSubmit}>
                <Autocomplete
                    sx={{ width: 300 }}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    loading={loading}
                    multiple
                    value={value}

                    isOptionEqualToValue={(option, value) => {
                        console.log('option in isOptionEqualToValue ---> ');
                        console.log(option);
                        return option.title === value.title
                    }}
                    onChange={(event, newValue) => {
                        console.log('event: ')
                        console.log(event)
                        console.log('newValue: ')
                        console.log(newValue)
                        if (typeof newValue === "string") {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                                openDialogOpen(true);
                                setDialogValue({
                                    name: newValue,
                                    slug: "",
                                    image: ""
                                });
                            });
                        } else if (
                            newValue.slice(-1)[0] &&
                            newValue.slice(-1)[0].inputValue
                        ) {
                            openDialogOpen(true);
                            setDialogValue({
                                name: newValue.slice(-1)[0].inputValue,
                                slug: "",
                                image: ""
                            });
                        } else {
                            setValue(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        console.log("filter options is running...");
                        console.log(options)
                        const filtered = filter(options, params);

                        const isExisting = options.some(
                            (option) => params.inputValue === option.title
                        );
                        if (params.inputValue !== "" && !isExisting) {
                            console.log("If part is running...");
                            filtered.push({
                                inputValue: params.inputValue,
                                name: `Add "${params.inputValue}" Category`
                            });
                        } else { console.log("This is else part.") }
                        console.log('filtered');
                        console.log(filtered);
                        return filtered;
                    }}
                    id="free-solo-dialog-demo"
                    {...console.log('data ... -->')}
                    {...console.log(data)}
                    options={data}
                    // getOptionLabel={(option) => option.title}
                    getOptionLabel={(option) => {
                        // e.g value selected with enter, right from the input
                        if (typeof option === "string") {
                            return option;
                        }
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        return option.name;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderOption={(props, option, { inputValue }) => {
                        const matches = match(option.name, inputValue);
                        const parts = parse(option.name, matches);

                        return (
                            <li {...props}>
                                <div>
                                    {parts.map((part, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                color: part.highlight ? "red" : "inherit",
                                                fontWeight: part.highlight ? 700 : 400
                                            }}
                                        >
                                            {part.text}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? (
                                            <CircularProgress color="inherit" size={20} />
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                )
                            }}
                            label="Product Categories"
                        />
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
            
            <Dialog open={openDialog} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add a new category</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Did you miss any film in our list? Please, add it!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.name}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    name: event.target.value
                                })
                            }
                            label="name"
                            type="text"
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="slug"
                            value={dialogValue.slug}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    slug: event.target.value
                                })
                            }
                            label="slug"
                            type="text"
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="image"
                            value={dialogValue.image}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    image: event.target.value
                                })
                            }
                            label="image"
                            type="file"
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}
