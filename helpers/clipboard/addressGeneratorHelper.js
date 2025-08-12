module.exports = { testchamber }

function testchamber() {
  const names = ['neo', 'trinity', 'morpheus', 'smith'];
  const domains = ['matrix.com', 'zion.org'];
  const streets = ['Main St', 'Oak Ave', 'Maple Dr', 'Pine Rd', 'Elm St'];
  const cities = ['Albany', 'Troy', 'Schenectady', 'Buffalo', 'Rochester'];
  const states = ['NY', 'CA', 'TX', 'FL', 'WA'];

  const name = names[Math.floor(Math.random() * names.length)];
  const num = Math.floor(Math.random() * 10000);
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const email = `${name}${num}@${domain}`;
  const phone = `(${Math.floor(100 + Math.random() * 900)}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;

  const addressLine1 = `${Math.floor(Math.random() * 9999) + 1} ${streets[Math.floor(Math.random() * streets.length)]}`;
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const zipCode = `${Math.floor(10000 + Math.random() * 89999)}`;

  return { 
    name: `${name}${num}`, 
    email, 
    phone, 
    addressLine1, 
    city, 
    state, 
    zipCode 
  };
}

/*function generateRandomAddress() {
  const streets = ['Main St', 'Oak Ave', 'Maple Dr', 'Pine Rd', 'Elm St'];
  const cities = ['Albany', 'Troy', 'Schenectady', 'Buffalo', 'Rochester'];
  const states = ['NY', 'CA', 'TX', 'FL', 'WA'];
  const addressLine1 = `${Math.floor(Math.random() * 9999) + 1} ${streets[Math.floor(Math.random() * streets.length)]}`;
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const zipCode = `${Math.floor(10000 + Math.random() * 89999)}`;
  return { addressLine1, city, state, zipCode };
}

function generateRandomPhone() {
  const area = Math.floor(100 + Math.random() * 900);
  const prefix = Math.floor(100 + Math.random() * 900);
  const line = Math.floor(1000 + Math.random() * 9000);
  return `(${area}) ${prefix}-${line}`;
}

function generateRandomNameEmail() {
  const names = ['john', 'jane', 'alice', 'bob', 'charlie'];
  const domains = ['example.com', 'mail.com', 'test.org', 'demo.net'];
  const name = names[Math.floor(Math.random() * names.length)];
  const num = Math.floor(Math.random() * 10000);
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const email = `${name}${num}@${domain}`; 
  return { name: `${name}${num}`, email };
}*/
