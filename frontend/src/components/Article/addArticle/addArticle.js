import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import { createArticle } from "../../../redux/features/article/article";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const AddArticle = () => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.article);
    const [article, setArticle] = useState({
        articleName: '',
        quantity: 0,
        user_id: 0,
    });

    const handleChange = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createArticle(article));
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                width: '300px',
                margin: 'auto',
                padding: 4,
                boxShadow: 3,
                borderRadius: 2,
            }}
        >
            <TextField
                label="Article"
                variant="outlined"
                name="articleName"
                value={article.articleName}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Quantité"
                type="number"
                variant="outlined"
                name="quantity"
                value={article.quantity}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Utilisateur"
                type="number"
                variant="outlined"
                name="user_id"
                value={article.user_id}
                onChange={handleChange}
                fullWidth
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Ajouter'}
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
        </Box>
    );
};

export default AddArticle;