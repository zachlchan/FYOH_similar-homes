---- to add constraints to tables, in terminal enter:
---- \i db_psql/constraints.sql

-- add constraints to listings table
ALTER TABLE trelia.listings ADD CONSTRAINT  valid_bd_count CHECK (size_bd > 0 AND size_bd < 10) NOT VALID;

ALTER TABLE trelia.listings ADD CONSTRAINT valid_ba_count CHECK (size_ba > 0 AND size_ba < 10) NOT VALID;

ALTER TABLE trelia.listings ADD CONSTRAINT valid_sqft_count CHECK (size_sqft > 1199 AND size_sqft < 4001) NOT VALID;

ALTER TABLE trelia.listings ADD CONSTRAINT street_address_length CHECK (LENGTH(street_address) <= 100 and street_address ~ '^[\w., ]*$') NOT VALID;

ALTER TABLE trelia.listings ADD CONSTRAINT neighborhood_length CHECK (LENGTH(neighborhood) <= 50 and neighborhood ~ '^[\w, ]*$') NOT VALID;

ALTER TABLE trelia.listings ADD CONSTRAINT listing_image_length CHECK (LENGTH(listing_image) <= 70) NOT VALID;


-- add constraints to similar_homes table
ALTER TABLE trelia.similar_homes ADD CONSTRAINT listing_id_fk FOREIGN KEY (listing_id) REFERENCES trelia.listings(listing_id) ON DELETE CASCADE NOT VALID;

ALTER TABLE trelia.similar_homes ADD CONSTRAINT similar_id_fk FOREIGN KEY (listing_id) REFERENCES trelia.listings(listing_id) ON DELETE CASCADE NOT VALID;


-- add constraints to users table
ALTER TABLE trelia.users ADD CONSTRAINT valid_user_name CHECK ( LENGTH (user_name) <= 50 and user_name ~ '^[\w.]*$') NOT VALID;

-- add constraints to user_favorites table
ALTER TABLE trelia.user_favorites ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES trelia.users(user_id) ON DELETE CASCADE NOT VALID;

ALTER TABLE trelia.user_favorites ADD CONSTRAINT listing_id_fk FOREIGN KEY (favorite_id) REFERENCES trelia.listings(listing_id) ON DELETE CASCADE NOT VALID;

