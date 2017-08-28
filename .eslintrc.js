module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
    "jsx-a11y/href-no-hash": "off",
    "react/no-array-index-key": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/forbid-prop-types": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
   },
  "globals":{
    "document": true
  }
};
