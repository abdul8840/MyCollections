import Country from '../models/country.model.js';

export const create = async (req, res, next) => {
  const { country, capital, currency, language, currency_code, region, isd_code, monetary, land, banknote, coin, island, images } = req.body

  if(!country || !capital || !currency || !language || !currency_code || !region || !isd_code || !monetary || !land || !banknote || !coin || !island || country === '' || capital === '' || currency === '' || language === '' || currency_code === '' || region === '' || isd_code === '' || monetary === '' || land === '' || banknote === '' || coin === '' || island === ''){
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newCountry = new Country({
    country,
    capital,
    currency,
    language,
    currency_code,
    region,
    isd_code,
    monetary,
    land,
    banknote, 
    coin, 
    island,
    images
  });

  try {
    await newCountry.save();
    res.json('Country created successfully');
  } catch (error) {
    next(error);
  }
};

export const getPost = async(req, res, next) => {
  try {
    const countries = await Country.find().exec();
    if (!countries) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.json(countries);
    } catch (error) {
      next(error);
      }
}

// Other controller functions...

export const getPostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Country.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};

// Edit a post by ID
export const editPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const updatedData = req.body;
    const updatedPost = await Country.findByIdAndUpdate(postId, updatedData, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post updated successfully', updatedPost });
  } catch (error) {
    next(error);
  }
};


export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Country.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    next(error);
  }
};