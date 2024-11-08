import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getArticle, updateArticle } from '../../../redux/features/article/article';

const EditArticle = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    
    const { article, isLoading, error } = useSelector((state) => state.articles);

    const [articleName, setArticleName] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        if (article) {
            setArticleName(article.articleName);
            setQuantity(article.quantity);
        } else {
            dispatch(getArticle(id));
        }
    }, [dispatch, id, article]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateArticle({ id, articleName, quantity }));
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                maxWidth: 400,
                margin: 'auto',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Modifier l'article
            </Typography>
            {isLoading ? (
                <Typography variant="body1">Chargement...</Typography>
            ) : error ? (
                <Typography variant="body1" color="error">
                    Une erreur est survenue lors de la récupération de l'article.
                </Typography>
            ) : (
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Nom de l'article"
                        variant="outlined"
                        fullWidth
                        value={articleName}
                        onChange={(e) => setArticleName(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Quantité"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Enregistrer
                    </Button>
                </form>
            )}
        </Box>
    );
};

export default EditArticle;
