insert into public.products (name, category, description, variants, image_url, is_available)
values
  ('Chicken Shawarma', 'Chicken', 'Juicy chicken, crunchy veg, signature cream and a hot griddle finish.', '[{"size":"Regular","price":2900},{"size":"Special","price":3500},{"size":"Jumbo","price":3900}]', 'https://images.pexels.com/photos/29306497/pexels-photo-29306497.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306497.jpg&fm=jpg', true),
  ('Beef Shawarma', 'Beef', 'Rich beef strips with pepper cream, cabbage and toasted wrap edges.', '[{"size":"Regular","price":3100},{"size":"Special","price":3700},{"size":"Jumbo","price":4200}]', 'https://images.pexels.com/photos/29306505/pexels-photo-29306505.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306505.jpg&fm=jpg', true),
  ('Suya Shawarma', 'Suya', 'Peppery suya spice, onion crunch and creamy heat in every bite.', '[{"size":"Regular","price":3200},{"size":"Special","price":3800},{"size":"Jumbo","price":4300}]', 'https://images.pexels.com/photos/29306506/pexels-photo-29306506.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306506.jpg&fm=jpg', true),
  ('Goat Shawarma', 'Goat', 'Smoky goat filling with green sauce lift and fresh-cut vegetables.', '[{"size":"Regular","price":3400},{"size":"Special","price":4100},{"size":"Jumbo","price":4700}]', 'https://images.pexels.com/photos/29306505/pexels-photo-29306505.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306505.jpg&fm=jpg', true),
  ('Turkey Shawarma', 'Turkey', 'Tender turkey with butter-toasted wrap and a fuller, richer filling.', '[{"size":"Regular","price":3500},{"size":"Special","price":4200},{"size":"Jumbo","price":4900}]', 'https://images.pexels.com/photos/29306497/pexels-photo-29306497.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306497.jpg&fm=jpg', true),
  ('Shrimken Shawarma', 'Shrimken', 'Chicken meets shrimp for a richer coastal-style shawarma build.', '[{"size":"Regular","price":3900},{"size":"Special","price":4600},{"size":"Jumbo","price":5400}]', 'https://images.pexels.com/photos/29306506/pexels-photo-29306506.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306506.jpg&fm=jpg', true),
  ('Lamb Shawarma', 'Lamb', 'Bold lamb flavour with sweet onion, chilli glaze and silky cream.', '[{"size":"Regular","price":4000},{"size":"Special","price":4700},{"size":"Jumbo","price":5600}]', 'https://images.pexels.com/photos/29306505/pexels-photo-29306505.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306505.jpg&fm=jpg', true),
  ('Shawarma Combo Box', 'Combos', 'One jumbo shawarma, fries and chilled drink bundled for quick decisions.', '[{"size":"Regular","price":5200},{"size":"Special","price":5900},{"size":"Jumbo","price":6600}]', 'https://images.pexels.com/photos/29306497/pexels-photo-29306497.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306497.jpg&fm=jpg', true),
  ('Frozen Drink Pair', 'Extras', 'Cold drink add-on for hot shawarma runs and combo upsells.', '[{"size":"Regular","price":800},{"size":"Special","price":1200},{"size":"Jumbo","price":1500}]', 'https://images.pexels.com/photos/29306506/pexels-photo-29306506.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306506.jpg&fm=jpg', true)
on conflict do nothing;

insert into public.extras (name, price, is_active)
values
  ('Extra sausage', 700, true),
  ('Extra cream', 500, true),
  ('Extra wrap', 600, true)
on conflict (name) do nothing;

update public.promotions set is_active = false;

insert into public.promotions (title, description, is_active)
values ('Buy 1 Get 1 Drink', 'Order any Special or Jumbo shawarma today and claim a chilled drink add-on.', true);
