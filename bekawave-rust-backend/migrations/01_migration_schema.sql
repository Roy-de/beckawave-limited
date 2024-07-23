BEGIN;


ALTER TABLE IF EXISTS public.debt DROP CONSTRAINT IF EXISTS customer_fkey;

ALTER TABLE IF EXISTS public.sales DROP CONSTRAINT IF EXISTS customer_id_fkey;

ALTER TABLE IF EXISTS public.sales DROP CONSTRAINT IF EXISTS sales_pair_fkey;

ALTER TABLE IF EXISTS public.sales DROP CONSTRAINT IF EXISTS sales_product_fkey;

ALTER TABLE IF EXISTS public.sales DROP CONSTRAINT IF EXISTS sales_rep_fkey;

ALTER TABLE IF EXISTS public.stock_record DROP CONSTRAINT IF EXISTS product_fkey;

ALTER TABLE IF EXISTS public.stock_record DROP CONSTRAINT IF EXISTS store_id_fkey;



DROP TABLE IF EXISTS public.customer;

CREATE TABLE IF NOT EXISTS public.customer
(
    customer_id bigserial NOT NULL,
    name character varying[] COLLATE pg_catalog."default" NOT NULL,
    phone_no character varying[] COLLATE pg_catalog."default" NOT NULL,
    location character varying[] COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT customer_pkey PRIMARY KEY (customer_id)
);

DROP TABLE IF EXISTS public.debt;

CREATE TABLE IF NOT EXISTS public.debt
(
    debt_id bigserial NOT NULL,
    customer_id bigint[] NOT NULL,
    amount bigint[] NOT NULL,
    date date NOT NULL,
    paid_date date,
    is_paid boolean NOT NULL DEFAULT false,
    CONSTRAINT debt_pkey PRIMARY KEY (debt_id)
);

DROP TABLE IF EXISTS public.product;

CREATE TABLE IF NOT EXISTS public.product
(
    product_id bigserial NOT NULL,
    name character varying[] COLLATE pg_catalog."default" NOT NULL,
    price bigint[] NOT NULL,
    CONSTRAINT product_pkey PRIMARY KEY (product_id)
);

DROP TABLE IF EXISTS public.sales;

CREATE TABLE IF NOT EXISTS public.sales
(
    sales_id bigserial NOT NULL,
    customer_id bigint[] NOT NULL,
    sales_pair_id bigint[],
    sales_rep_id bigint[],
    total_price character varying[] COLLATE pg_catalog."default" NOT NULL,
    sales_time date NOT NULL,
    product_id bigint[] NOT NULL,
    product_quantity bigint[] NOT NULL,
    CONSTRAINT sales_pkey PRIMARY KEY (sales_id)
);

DROP TABLE IF EXISTS public.sales_pair;

CREATE TABLE IF NOT EXISTS public.sales_pair
(
    sales_pair_id bigserial NOT NULL,
    sales_rep_id_one bigint[] NOT NULL,
    sales_rep_id_two bigint[] NOT NULL,
    CONSTRAINT sales_pair_pkey PRIMARY KEY (sales_pair_id)
);

DROP TABLE IF EXISTS public.sales_rep;

CREATE TABLE IF NOT EXISTS public.sales_rep
(
    sales_rep_id bigserial NOT NULL,
    name character varying[] COLLATE pg_catalog."default" NOT NULL,
    phone_no character varying[] COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT sales_rep_pkey PRIMARY KEY (sales_rep_id)
);

DROP TABLE IF EXISTS public.stock_record;

CREATE TABLE IF NOT EXISTS public.stock_record
(
    stock_id bigserial NOT NULL,
    store_id bigint[] NOT NULL,
    amount bigint[] NOT NULL,
    product_id bigint[] NOT NULL,
    quantity bigint[] NOT NULL,
    product_worth bigint[] NOT NULL,
    CONSTRAINT stock_record_pkey PRIMARY KEY (stock_id)
);

DROP TABLE IF EXISTS public.store;

CREATE TABLE IF NOT EXISTS public.store
(
    store_id bigserial NOT NULL,
    name character varying[] COLLATE pg_catalog."default" NOT NULL,
    location character varying[] COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT store_pkey PRIMARY KEY (store_id)
);

ALTER TABLE IF EXISTS public.debt
    ADD CONSTRAINT customer_fkey FOREIGN KEY (customer_id)
    REFERENCES public.customer (customer_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.sales
    ADD CONSTRAINT customer_id_fkey FOREIGN KEY (customer_id)
    REFERENCES public.customer (customer_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.sales
    ADD CONSTRAINT sales_pair_fkey FOREIGN KEY (sales_pair_id)
    REFERENCES public.sales_pair (sales_pair_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.sales
    ADD CONSTRAINT sales_product_fkey FOREIGN KEY (product_id)
    REFERENCES public.product (product_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.sales
    ADD CONSTRAINT sales_rep_fkey FOREIGN KEY (sales_rep_id)
    REFERENCES public.sales_rep (sales_rep_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.stock_record
    ADD CONSTRAINT product_fkey FOREIGN KEY (product_id)
    REFERENCES public.product (product_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.stock_record
    ADD CONSTRAINT store_id_fkey FOREIGN KEY (store_id)
    REFERENCES public.store (store_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;