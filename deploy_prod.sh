yarn install
CI=false yarn build:production
aws s3 cp build/ s3://app.callsine.com --recursive --profile union
aws configure set preview.cloudfront true --profile union
aws cloudfront create-invalidation --distribution-id E21UHGQHIZ4ER8 --paths "/*" --profile union
